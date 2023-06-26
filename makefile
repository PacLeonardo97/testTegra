install:
	cd ./frontend && yarn && cd ../mobile/tegramobile && yarn && cd ..

execFront:
	cd ./frontend && yarn dev

execAndroid:
	cd ./mobile/tegramobile && yarn android
