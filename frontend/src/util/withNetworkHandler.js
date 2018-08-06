import React from "react";

let pendingRequestCount = 0;

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      loading: false
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        pendingRequestCount++;
        this.setState({
          loading: pendingRequestCount > 0
        });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => {
          setTimeout(() => {
            pendingRequestCount--;
            this.setState({
              loading: pendingRequestCount > 0
            });
          }, 500);
          return res;
        },
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <WrappedComponent {...this.props} isLoading={this.state.loading} />
      );
    }
  };
};

export default withErrorHandler;
