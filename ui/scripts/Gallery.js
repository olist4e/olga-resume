var React = window.React = require('react');
var Modal = require('react-bootstrap').Modal;
var ModalTrigger = require('react-bootstrap').ModalTrigger;
var Button = require('react-bootstrap').Button;

var MyModal = React.createClass({
  'render': function() {
  	var object = this.props.object;
  	var src = object.src;
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



var Gallery = React.createClass({
	onRequestShow: function() {
		alert("Showing");
	},
	render: function() {
		var images = this.props.images;
		var onRequestShow = this.onRequestShow;
		return <div className='gallery'>
			{images.map(function(object, i){
				var style = {backgroundImage: "url(" + object.src + ")", width: "390px", height: "390px",
				display: "inline-block"};
				return <ModalTrigger modal={<MyModal object={object} onRequestShow={onRequestShow}/> }>
			    <div style={style} src={object.src} key={i}>{object.caption}</div>
			  </ModalTrigger>;
		        
		    })}
		    
		  </div>;
	}
});

module.exports = Gallery;