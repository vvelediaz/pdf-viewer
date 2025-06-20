import { Component, ErrorInfo, ReactNode } from 'react'
import { IonCard, IonCardContent, IonButton, IonText, IonIcon } from '@ionic/react'
import { refreshOutline } from 'ionicons/icons'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Error boundary caught an error:', error, errorInfo)
	}

	public render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<IonCard className="error-boundary">
					<IonCardContent>
						<div className="error-boundary-content">
							<IonText color="danger">
								<h3>Something went wrong</h3>
							</IonText>
							<IonText color="medium">
								<p>An unexpected error occurred while loading the PDF.</p>
							</IonText>
							<details style={{
								whiteSpace: 'pre-wrap',
								marginTop: '10px',
								padding: '8px',
								backgroundColor: 'var(--ion-color-light)',
								borderRadius: '4px',
								border: '1px solid var(--ion-color-medium)',
								fontFamily: 'monospace',
								fontSize: '12px'
							}}>
								<summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '5px' }}>
									Error details
								</summary>
								{this.state.error && this.state.error.toString()}
							</details>
							<IonButton
								expand="block"
								fill="outline"
								color="primary"
								onClick={() => this.setState({ hasError: false })}
								style={{ marginTop: '16px' }}
							>
								<IonIcon icon={refreshOutline} slot="start" />
								Try Again
							</IonButton>
						</div>
					</IonCardContent>
				</IonCard>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary 