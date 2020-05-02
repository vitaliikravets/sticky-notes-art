import React, { useEffect }  from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { selectImageData } from './selectors';
import { createStructuredSelector } from 'reselect';

function GeneratorPage(props) {
  const key = 'GeneratorPage';

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const canvasRef = React.useRef(null);
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
  });

  return (
    <>
      <h1>
        <FormattedMessage {...messages.uploadImage} />
      </h1>
      <input type="file" name="photo" onChange={event => props.actions.imageSelected(event)}/>
      <canvas ref={canvasRef} width="300" height="227"></canvas>
      <img ref={imageRef} src={props.imageData} style={{display: 'none'}} />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  imageData: selectImageData()
});

function mapActionsToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapActionsToProps)(GeneratorPage);
