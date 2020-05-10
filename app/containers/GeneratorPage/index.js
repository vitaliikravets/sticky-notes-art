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
import { selectImageData, selectCellSizeFactor } from './selectors';
import { createStructuredSelector } from 'reselect';
import { drawGrid } from 'services/canvasService';

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
    ctx.canvas.width = image.width;
    ctx.canvas.height = image.height
    ctx.drawImage(image, 0, 0);

    drawGrid(ctx, props.cellSizeFactor);
  });

  return (
    <>
      <h1>
        <FormattedMessage {...messages.uploadImage} />
      </h1>
      <input type="file" name="photo" onChange={event => props.actions.imageSelected(event)}/>
      <canvas ref={canvasRef} ></canvas>
      <img ref={imageRef} src={props.imageData} style={{display: 'none'}} />
      <input type="range" min="1" max="100" value={props.cellSizeFactor}
        onChange={event => props.actions.changeCellSizeFactor(event)} />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  imageData: selectImageData(),
  cellSizeFactor: selectCellSizeFactor()
});

function mapActionsToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapActionsToProps)(GeneratorPage);
