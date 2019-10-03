
            var container, loader, rayInput;
			var camera, scene, renderer;
			var controller1, controller2;

			var line;
            var shapes = {};
            var cubeGeo;

			var up = new THREE.Vector3( 0, 1, 0 );

			var vector1 = new THREE.Vector3();
			var vector2 = new THREE.Vector3();
			var vector3 = new THREE.Vector3();
			var vector4 = new THREE.Vector3();
			import * as THREE from '../build/three.module.js';
			import { GLTFLoader } from '../build/GLTFLoader.js';
			import { WEBVR } from '../build/WebVR.js';
			

			init();
			initGeometry();
			animate();

			function init() {
                renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
                renderer.vr.enabled = true;
                
                container = document.createElement( 'div' );
				document.body.appendChild( container );


				container.appendChild( renderer.domElement );
				document.body.appendChild( WEBVR.createButton(renderer))
				

			
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x222222 );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 100 );
                camera.position.set(0, 1, 3);
                
                var reticle = new THREE.Mesh(
                    new THREE.RingBufferGeometry(0.66 / 50, 1 / 50, 32),
                    new THREE.MeshBasicMaterial( {color: 0xffffff, opacity: 0.5, transparent: true, side: THREE.DoubleSide })
                );

                //???//
                reticle.position.set(0, 0, -1);
                reticle.lookAt(camera.position);
                camera.add(reticle);
                
                // Initialize new ray input
                rayInput = new RayInput.default(camera, renderer.domElement);
                rayInput.setSize(renderer.getSize());
   
				var geometry = new THREE.BoxBufferGeometry( 0.5, 0.5, 0.5 );
				var material = new THREE.MeshStandardMaterial( {
					color: 0xffffff,
					roughness: 1.0,
					metalness: 0.0
                } );
                
				var cube = new THREE.Mesh( geometry, material );
				cube.position.set = (0,-1,-4);
				//cube.position.y = -2;
				//cube.position.z = 0;
				//scene.add( cube );

				var geometry = new THREE.PlaneBufferGeometry( 4, 4 );
				var material = new THREE.MeshStandardMaterial( {
					color: 0xffffff,
					roughness: 1.0,
					metalness: 0.0
				} );
				
				var floor = new THREE.Mesh( geometry, material );
				floor.rotation.x = - Math.PI / 2;
				//scene.add( floor );
				
				loader = new GLTFLoader();
						loader.load( '../flower/flower.gltf', function(x){
						x.scene.scale.set( 1, 1, 1 );
						x.scene.position.set(0,-1,-4);
						//x.scene.position.copy( intersect.point ).add( intersect.face.normal );
						//x.scene.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
						scene.add( x.scene );
					});

              

				var grid = new THREE.GridHelper( 100, 20, 0xcabfe3 , 0xc55cfa);
				grid.material.depthTest = false; // avoid z-fighting
				grid.position.set(0,-2,0);
				scene.add( grid );

				scene.add( new THREE.HemisphereLight( 0x888877, 0x777788 ) );

				var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
				light.position.set( 0, 4, 0 );
				scene.add( light );

				//

				

				// controllers

				function onSelectStart() {

					this.userData.isSelecting = true;

				}

				function onSelectEnd() {

					this.userData.isSelecting = false;

				}

				controller1 = renderer.vr.getController( 0 );
				controller1.addEventListener( 'selectstart', onSelectStart );
				controller1.addEventListener( 'selectend', onSelectEnd );
				controller1.userData.points = [ new THREE.Vector3(), new THREE.Vector3() ];
				controller1.userData.matrices = [ new THREE.Matrix4(), new THREE.Matrix4() ];
				scene.add( controller1 );

				controller2 = renderer.vr.getController( 1 );
				controller2.addEventListener( 'selectstart', onSelectStart );
				controller2.addEventListener( 'selectend', onSelectEnd );
				controller2.userData.points = [ new THREE.Vector3(), new THREE.Vector3() ];
				controller2.userData.matrices = [ new THREE.Matrix4(), new THREE.Matrix4() ];
				scene.add( controller2 );

				//

				var geometry = new THREE.CylinderBufferGeometry( 0.01, 0.02, 0.08, 5 );
				geometry.rotateX( - Math.PI / 2 );
				var material = new THREE.MeshStandardMaterial( { flatShading: true } );
				var mesh = new THREE.Mesh( geometry, material );

				var pivot = new THREE.Mesh( new THREE.IcosahedronBufferGeometry( 0.01, 2 ) );
				pivot.name = 'pivot';
				pivot.position.z = - 0.05;
				mesh.add( pivot );

				controller1.add( mesh.clone() );
				controller2.add( mesh.clone() );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function initGeometry() {

				var geometry = new THREE.BufferGeometry();

				var positions = new THREE.BufferAttribute( new Float32Array( 1000000 * 3 ), 3 );
				positions.dynamic = true;
				geometry.addAttribute( 'position', positions );

				var normals = new THREE.BufferAttribute( new Float32Array( 1000000 * 3 ), 3 );
				normals.dynamic = true;
				geometry.addAttribute( 'normal', normals );

				var colors = new THREE.BufferAttribute( new Float32Array( 1000000 * 3 ), 3 );
				colors.dynamic = true;
				geometry.addAttribute( 'color', colors );

				geometry.drawRange.count = 0;

				var material = new THREE.MeshStandardMaterial( {
					roughness: 0.9,
					metalness: 0.0,
					vertexColors: THREE.VertexColors
				} );

				line = new THREE.Mesh( geometry, material );
				line.frustumCulled = false;
				scene.add( line );

				// Shapes
				shapes[ 'tube' ] = getTubeShapes( 1.0 );

			}

			function getTubeShapes( size ) {

				var PI2 = Math.PI * 2;

				var sides = 10;
				var array = [];
				var radius = 0.01 * size;

				for ( var i = 0; i < sides; i ++ ) {

					var angle = ( i / sides ) * PI2;
					array.push( new THREE.Vector3( Math.sin( angle ) * radius, Math.cos( angle ) * radius, 0 ) );

				}

				return array;

			}

			function stroke( controller, point1, point2, matrix1, matrix2 ) {

				var color = new THREE.Color( 0xffffff );
				var size = 1;

				var shapes = getTubeShapes( size );

				var geometry = line.geometry;
				var attributes = geometry.attributes;
				var count = geometry.drawRange.count;

				var positions = attributes.position.array;
				var normals = attributes.normal.array;
				var colors = attributes.color.array;

				for ( var j = 0, jl = shapes.length; j < jl; j ++ ) {

					var vertex1 = shapes[ j ];
					var vertex2 = shapes[ ( j + 1 ) % jl ];

					// positions

					vector1.copy( vertex1 );
					vector1.applyMatrix4( matrix2 );
					vector1.add( point2 );

					vector2.copy( vertex2 );
					vector2.applyMatrix4( matrix2 );
					vector2.add( point2 );

					vector3.copy( vertex2 );
					vector3.applyMatrix4( matrix1 );
					vector3.add( point1 );

					vector4.copy( vertex1 );
					vector4.applyMatrix4( matrix1 );
					vector4.add( point1 );

					vector1.toArray( positions, ( count + 0 ) * 3 );
					vector2.toArray( positions, ( count + 1 ) * 3 );
					vector4.toArray( positions, ( count + 2 ) * 3 );

					vector2.toArray( positions, ( count + 3 ) * 3 );
					vector3.toArray( positions, ( count + 4 ) * 3 );
					vector4.toArray( positions, ( count + 5 ) * 3 );

					// normals

					vector1.copy( vertex1 );
					vector1.applyMatrix4( matrix2 );
					vector1.normalize();

					vector2.copy( vertex2 );
					vector2.applyMatrix4( matrix2 );
					vector2.normalize();

					vector3.copy( vertex2 );
					vector3.applyMatrix4( matrix1 );
					vector3.normalize();

					vector4.copy( vertex1 );
					vector4.applyMatrix4( matrix1 );
					vector4.normalize();

					vector1.toArray( normals, ( count + 0 ) * 3 );
					vector2.toArray( normals, ( count + 1 ) * 3 );
					vector4.toArray( normals, ( count + 2 ) * 3 );

					vector2.toArray( normals, ( count + 3 ) * 3 );
					vector3.toArray( normals, ( count + 4 ) * 3 );
					vector4.toArray( normals, ( count + 5 ) * 3 );

					// colors

					color.toArray( colors, ( count + 0 ) * 3 );
					color.toArray( colors, ( count + 1 ) * 3 );
					color.toArray( colors, ( count + 2 ) * 3 );

					color.toArray( colors, ( count + 3 ) * 3 );
					color.toArray( colors, ( count + 4 ) * 3 );
					color.toArray( colors, ( count + 5 ) * 3 );

					count += 6;

				}

				geometry.drawRange.count = count;

			}

			function updateGeometry( start, end ) {

				if ( start === end ) return;

				var offset = start * 3;
				var count = ( end - start ) * 3;

				var geometry = line.geometry;
				var attributes = geometry.attributes;

				attributes.position.updateRange.offset = offset;
				attributes.position.updateRange.count = count;
				attributes.position.needsUpdate = true;

				attributes.normal.updateRange.offset = offset;
				attributes.normal.updateRange.count = count;
				attributes.normal.needsUpdate = true;

				attributes.color.updateRange.offset = offset;
				attributes.color.updateRange.count = count;
				attributes.color.needsUpdate = true;

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function handleController( controller ) {

				var pivot = controller.getObjectByName( 'pivot' );

				if ( pivot ) {

					var matrix = pivot.matrixWorld;

					var point1 = controller.userData.points[ 0 ];
					var point2 = controller.userData.points[ 1 ];

					var matrix1 = controller.userData.matrices[ 0 ];
					var matrix2 = controller.userData.matrices[ 1 ];

					point1.setFromMatrixPosition( matrix );
					matrix1.lookAt( point2, point1, up );

					if ( controller.userData.isSelecting === true ) {

						stroke( controller, point1, point2, matrix1, matrix2 );

					}

					point2.copy( point1 );
					matrix2.copy( matrix1 );

				}

			}

			function animate() {

				renderer.setAnimationLoop( render );

			}

			function render() {

				var count = line.geometry.drawRange.count;

				handleController( controller1 );
				handleController( controller2 );

				updateGeometry( count, line.geometry.drawRange.count );

				renderer.render( scene, camera );

			}