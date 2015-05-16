var React = window.React = require('react');
var Modal = require('react-bootstrap').Modal;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var Button = require('react-bootstrap').Button;

var MyModal = React.createClass({
  'render': function() {
  	var object = this.props.object;
  	var src = object.original;
  	var caption = object.caption;
  	var title = object.title

    return (
      <Modal {...this.props} title={title} animation={false}>
        <div className='modal-body'>
          <img src={src} width="100%" />
        </div>
      </Modal>
    );
  }
});



var ProjectThumbnails = React.createClass({
	getDefaultProps: function() {
		return {
			height: "200px",
			width: "200px"
		}
	},
	onRequestShow: function() {
		alert("Showing");
	},
	render: function() {
		var images = this.props.images;
		var onRequestShow = this.onRequestShow;
		var width = this.props.width;
		var height = this.props.height;
		return <div className='gallery'>
			{images.map(function(object, i){
				var style = {
					backgroundImage: "url(" + (object.thumbnail || object.original) + ")",
					width: width, height: height,
					display: "inline-block"
				};
				console.log("Style", style);
				console.log("object", object);
				return <ModalTrigger modal={<MyModal object={object} onRequestShow={onRequestShow}/> }>
			    <div style={style} src={object.src} key={i}>{object.caption}</div>
			  </ModalTrigger>;
		        
		    })}
		    
		  </div>;
	}
});

module.exports = ProjectThumbnails;
