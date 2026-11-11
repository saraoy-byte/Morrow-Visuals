import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060607] text-[#EDECE8] flex items-center justify-center p-6 select-none font-sans">
          <div className="max-w-md w-full bg-[#0A0A0E] border border-white/10 rounded-xl p-8 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#DDA838]/10 border border-[#DDA838]/40 text-[#DDA838] flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold uppercase text-white tracking-wider">
              Something went wrong
            </h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              An unexpected display issue occurred. Click reload below to refresh the experience.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-zinc-500 bg-black/60 p-3 rounded text-left overflow-x-auto max-h-32">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 text-xs font-mono rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="btn-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider"
              >
                Reload App
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
