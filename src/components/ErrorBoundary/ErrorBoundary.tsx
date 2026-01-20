import { Component, type ReactNode, type ErrorInfo } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-title">Something went wrong.</div>
          <div className="error-subtitle">
            Please reload the page to continue.
          </div>
          <button
            type="button"
            className="error-button"
            onClick={this.handleReload}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
