<template>
	<div class="canvas" id="canvas">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "App",
	mounted() {
		this.$store.dispatch("initialize");
		window.addEventListener("resize", this.handleResize);
		this.animate();
	},
	methods: {
		handleResize() {
			this.$store.dispatch("handleResize");
		},
		animate() {
			requestAnimationFrame(this.animate);
			this.$store.dispatch("animate");
		},
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.handleResize);
	},
};
</script>

<style lang="scss">
*,
*:before,
*:after {
	box-sizing: border-box;
	font-weight: 300;
	outline: none;
}
html,
body {
	font-size: 62.5%;
	border: 0;
	margin: 0;
	padding: 0;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
.canvas {
	font-size: 1.6rem;
	position: absolute;
	color: #fff;
}
</style>
