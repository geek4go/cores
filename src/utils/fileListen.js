const fileListen = function (props, namespace) {

	const fileListHandle = {

		change: function() {

			console.log('change');
			props.dispatch({
	            type: 'cpre/setLoading'
	        });
	        var gospelCommonPreviewer = window.frames['gospel-common-previewer'];
			if(gospelCommonPreviewer != null){
				gospelCommonPreviewer.location.reload();
			}
		},
		remove: function() {
			props.dispatch({
				type: 'file/fetchFileList'
			});
		},
		add: function() {
			console.log('add');
			props.dispatch({
				type: 'file/fetchFileList'
			});
		},
		addDir: function() {
			console.log('addDir');
			props.dispatch({
				type: 'file/fetchFileList'
			});
		},
		unlinkDir: function(){
			props.dispatch({
				type: 'file/fetchFileList'
			});
		},
		unlink: function(){
			props.dispatch({
				type: 'file/fetchFileList'
			});
		},
	}

	let protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
	let socketURL = protocol + localStorage.host + ':9999';
	//let socketURL = protocol + 'localhost:8089';

	let socket = io(socketURL, {'reconnect':false,'auto connect':false} );

	socket.on('message', function(data) {

		var data = data.split('-:-');
		fileListHandle[data[0]]();

	})
	socket.on('connections', function(data) {

		// console.log(data);

	})
	socket.on('connect', function(data) {

		//console.log('connect');

		socket.emit( 'message', namespace)

	});
	window.fileSocket = socket;

}

export default fileListen;
