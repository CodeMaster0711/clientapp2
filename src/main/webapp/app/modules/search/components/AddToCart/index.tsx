/* tslint:disable */ import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactModal from 'react-modal';
import './styles.css';

class AddToCart extends React.Component<any, {showModal: boolean}> {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  handleOpenModal = e => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  AddToCart = () => {
    const submitBtn = document.getElementById('AddToCart');

    this.handleCloseModal();
    ReactDOM.unmountComponentAtNode(document.getElementById('AddToCarGhost'));
    // show real submit button
    if (submitBtn) {
      submitBtn.style.display = 'inline-block';
      submitBtn.click();
    }
  };

  render() {
    return (
      <div>
        <button
          className="btn"
          id="AddToCart"
          name="add"
          onClick={this.handleOpenModal}
          type="submit"
        >
          <span id="AddToCartText">Add to Cart</span>
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Add to cart"
          className="b-modal"
          overlayClassName="b-overlay"
          onRequestClose={this.handleCloseModal}
        >
          <div className="b-modal__button-group">
            <button
              id="b-btn-add"
              className="btn btn--flipped"
              onClick={this.AddToCart}
            >
              Ok
            </button>
            <button className="btn--secondary" onClick={this.handleCloseModal}>
              Cancel
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default AddToCart;
