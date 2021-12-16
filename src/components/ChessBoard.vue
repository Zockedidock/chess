<script setup lang="ts">
WebAssembly.instantiateStreaming(fetch("test.wasm")).then((obj) => {
	const square = obj.instance.exports.square as CallableFunction
	let result = square(2)
	console.log(result)
})

let greeting: string = "Hello World!"
</script>

<template>
	{{ greeting }}
	<div class="board">
		<div v-for="y in 8">
			<div v-for="x in 8">
				<div class="white_piece piece" v-if="(y + x) % 2 == 0">
					<p v-if="y === 1" class="y white">
						{{ 9 - x }}
					</p>
					<p v-if="x === 8" class="x white">
						{{ String.fromCharCode(y + 64).toLocaleLowerCase() }}
					</p>
				</div>
				<div class="black_piece piece" v-else>
					<p v-if="y === 1" class="y black">
						{{ 9 - x }}
					</p>
					<p v-if="x === 8" class="x black">
						{{ String.fromCharCode(y + 64).toLocaleLowerCase() }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
$board-width: 500px;
$board-height: 500px;
$piece-width: calc($board-width / 8);
$piece-height: calc($board-height / 8);
$piece-color-black: #769656;
$piece-color-white: #eeeed2;
$margin-horizontal: calc($piece-width / 20);
$margin-vertical: calc($piece-height / 20);
$legend-font-size: calc($piece-width / 4);

.board {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 1fr);
	width: $board-width;
	height: $board-height;
}
.piece {
	width: $piece-width;
	height: $piece-height;
	z-index: 1;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	p {
		z-index: 10;
		font-size: $legend-font-size;
	}
	.black {
		color: $piece-color-white;
	}
	.white {
		color: $piece-color-black;
	}
}
.black_piece {
	background-color: $piece-color-black;
}
.white_piece {
	background-color: $piece-color-white;
}
.y {
	margin: $margin-vertical;
}
.x {
	margin: $margin-horizontal;
	grid-row-start: 3;
	grid-row-end: 4;
	grid-column-start: 3;
	grid-column-end: 4;
}
</style>
