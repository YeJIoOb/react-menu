'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var buildClassName = require('../mixins/buildClassName');

var MenuOption = module.exports = React.createClass({
  displayName: 'exports',


  propTypes: {
    active: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    onDisabledSelect: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    role: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      role: 'menuitem'
    };
  },

  mixins: [buildClassName],

  notifyDisabledSelect: function notifyDisabledSelect() {
    if (this.props.onDisabledSelect) {
      this.props.onDisabledSelect();
    }
  },

  onSelect: function onSelect() {
    if (this.props.disabled) {
      this.notifyDisabledSelect();
      //early return if disabled
      return;
    }
    if (this.props.onSelect) {
      this.props.onSelect();
    }
    this.props._internalSelect();
  },

  handleKeyUp: function handleKeyUp(e) {
    if (e.key === ' ') {
      this.onSelect();
    }
  },

  handleKeyDown: function handleKeyDown(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.onSelect();
    }
  },

  handleClick: function handleClick() {
    this.onSelect();
  },

  handleHover: function handleHover() {
    this.props._internalFocus(this.props.index);
  },

  buildName: function buildName() {
    var name = this.buildClassName('Menu__MenuOption');
    if (this.props.active) {
      name += ' Menu__MenuOption--active';
    }
    if (this.props.disabled) {
      name += ' Menu__MenuOption--disabled';
    }
    return name;
  },

  render: function render() {
    var _props = this.props,
      active = _props.active,
      onSelect = _props.onSelect,
      onDisabledSelect = _props.onDisabledSelect,
      disabled = _props.disabled,
      role = _props.role,
      children = _props.children,
      otherProps = _objectWithoutProperties(_props, ['active', 'onSelect', 'onDisabledSelect', 'disabled', 'role', 'children']);

    return React.createElement(
      'div',
      _extends({}, otherProps, {
        onClick: this.handleClick,
        onKeyUp: this.handleKeyUp,
        onKeyDown: this.handleKeyDown,
        onMouseOver: this.handleHover,
        className: this.buildName(),
        role: role,
        tabIndex: '-1',
        'aria-disabled': disabled
      }),
      children
    );
  }

});