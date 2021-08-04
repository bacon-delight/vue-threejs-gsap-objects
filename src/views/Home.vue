<template>
	<div class="wrapper">home</div>
</template>

<script>
import * as THREE from "three";
export default {
	name: "Home",
	mounted() {
		const geometry = new THREE.OctahedronGeometry(1, 0);
		const material = new THREE.MeshStandardMaterial({
			color: 0xff6347,
			roughness: 0.4,
			metalness: 0.3,
		});
		const sphere = new THREE.Mesh(geometry, material);
		sphere.animation = () => {
			sphere.rotation.x += 0.005;
			sphere.rotation.y += 0.005;
		};
		this.$store.dispatch("addMeshToScene", sphere);
	},
};
</script>

<style lang="scss" scoped>
.wrapper {
}
</style>
