import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription } from '../alert'
import { AlertCircle, Terminal } from 'lucide-react'

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertIcon>
        <Terminal className="h-4 w-4" />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertIcon>
        <AlertCircle className="h-4 w-4" />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
}
