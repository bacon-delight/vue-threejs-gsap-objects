import Vue from "vue";
import Vuex from "vuex";

import _ from "lodash";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		scene: new THREE.Scene(),
		camera: null,
		renderer: null,
		control: null,

		// Environment
		environment: {
			counter: 0,
			meshes: [],
		},

		// Extras
		ambientLight: null,
		directionalLight: null,
	},
	mutations: {
		initializeCamera(state) {
			state.camera = new THREE.PerspectiveCamera(
				50,
				window.innerWidth / window.innerHeight,
				0.01,
				100
			);
			state.camera.position.set(0, 0, 8);
			state.camera.lookAt(new THREE.Vector3());
		},
		initializeRenderer(state) {
			state.renderer = new THREE.WebGLRenderer({ antialias: true });
			state.renderer.setSize(window.innerWidth, window.innerHeight);
			state.renderer.setPixelRatio(window.devicePixelRatio);
			state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			document.body.appendChild(state.renderer.domElement);
		},
		initializeLights(state) {
			// Ambient Light
			state.ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
			state.scene.add(state.ambientLight);

			// Directional Light
			(state.directionalLight = new THREE.DirectionalLight(0xffffff, 3)),
				state.directionalLight.position.set(-5, 5, 5);
			state.scene.add(state.directionalLight);
		},
		initializeOrbitControls(state) {
			state.control = new OrbitControls(
				state.camera,
				state.renderer.domElement
			);
			state.control.update();
		},

		// Scene and Environment
		addMeshToScene(state, mesh) {
			state.scene.add(mesh);
			state.environment.meshes.push(mesh);
		},

		// Events
		handleResize(state) {
			state.camera.aspect = window.innerWidth / window.innerHeight;
			state.camera.updateProjectionMatrix();
			state.renderer.setSize(window.innerWidth, window.innerHeight);
			state.renderer.setPixelRatio(window.devicePixelRatio);
		},

		// Render Updates
		updateRendering(state) {
			state.environment.counter += 0.1;

			// Mesh Animations
			_.forEach(state.environment.meshes, (mesh) => {
				if (mesh.animation) {
					mesh.animation();
				}
			});
			state.renderer.render(state.scene, state.camera);
		},
	},
	actions: {
		initialize(context) {
			context.commit("initializeCamera");
			context.commit("initializeRenderer");
			context.commit("initializeLights");
			context.commit("initializeOrbitControls");
		},
		handleResize(context) {
			context.commit("handleResize");
		},
		animate(context) {
			context.commit("updateRendering");
		},
		addMeshToScene(context, mesh) {
			context.commit("addMeshToScene", mesh);
		},
	},
	getters: {},
	modules: {},
});
