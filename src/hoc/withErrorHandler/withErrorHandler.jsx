import React, { useEffect, useState } from "react";
import Aux from "../Aux";
import Modal from "../../components/UI/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const interceptorReq = () => {
      axios.interceptors.request.use((request) => {
        setError(null);
        return request;
      });
    };

    const interceptorResp = () => {
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error });
        }
      );
    };

    useEffect(interceptorReq, []);
    useEffect(interceptorResp, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} closeModal={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
  // return class extends Component {
  //   state = {
  //     error: null,
  //   };

  //   componentDidMount() {
  //     axios.interceptors.request.use((request) => {
  //       this.setState({ error: null });
  //       return request;
  //     });
  //     axios.interceptors.response.use(
  //       (response) => response,
  //       (error) => {
  //         this.setState({ error });
  //       }
  //     );
  //   }

  //   errorConfirmedHandler = () => {
  //     this.setState({ error: null });
  //   };

  //   render() {
  //     return (
  //       <Aux>
  //         <Modal
  //           show={this.state.error}
  //           closeModal={this.errorConfirmedHandler}
  //         >
  //           {this.state.error ? this.state.error.message : null}
  //         </Modal>
  //         <WrappedComponent {...this.props} />
  //       </Aux>
  //     );
  //   }
  // };
};

export default withErrorHandler;
