var React = window.React = require('react');
var ImageGallery = require('./ImageGallery.js');




var ProjectGallery = React.createClass({
	
	render: function() {
		var images = this.props.images;
		return <ImageGallery items={images} autoplay={false} slideInterval={4000} />;
	}
});

module.exports = ProjectGallery;