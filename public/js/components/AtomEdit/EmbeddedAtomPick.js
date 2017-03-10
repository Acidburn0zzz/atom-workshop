import React, {PropTypes} from 'react';
import {atomPropType} from '../../constants/atomPropType.js';

class EmbeddedAtomPick extends React.Component {

  static propTypes = {
    atom: atomPropType.isRequired,
    publishAtom: PropTypes.func.isRequired
  }

  triggerEmbedMessage = () => {
    window.parent.postMessage({
      atomId: this.props.atom.id,
      atomType: this.props.atom.atomType
    }, '*');
  }

  triggerAtomPublished = () => {
    this.props.publishAtom(this.props.atom);
  }

  atomHasBeenPublished(){
    !!this.props.atom.contentChangeDetails.published;
  }

  render () {

    if (!this.atomHasBeenPublished()) {
      return (
        <div className="atom-editor__embed-pick">
          <button className="btn" onClick={this.triggerEmbedMessage()}>
            Publish this atom
          </button>
          <span> - This atom has not been published, once published it can be embedded</span>
        </div>
      );
    }

    return (
      <div className="atom-editor__embed-pick">
        <button className="btn" onClick={this.triggerEmbedMessage()}>
          Pick this atom
        </button>
      </div>
    );
  }
}

export default EmbeddedAtomPick;