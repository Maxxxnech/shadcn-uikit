import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart3, MoreVertical, TrendingUp, Shield, AlertTriangle, Activity } from 'lucide-react'
import {
  Widget,
  WidgetHeader,
  WidgetIcon,
  WidgetTitle,
  WidgetActions,
  WidgetContent,
  WidgetFooter,
  WidgetValue,
  WidgetLabel,
  WidgetDivider,
} from '../widget'
import { Button } from '../button'

const meta = {
  title: 'UI/Widget',
  component: Widget,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    interactive: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Widget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Widget className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <BarChart3 />
        </WidgetIcon>
        <WidgetTitle>Widget Title</WidgetTitle>
        <WidgetActions>
          <button type="button" aria-label="More options">
            <MoreVertical />
          </button>
        </WidgetActions>
      </WidgetHeader>
      <WidgetContent>
        <p className="text-sm text-muted-foreground">Widget content goes here.</p>
      </WidgetContent>
      <WidgetFooter>
        <p className="text-xs text-muted-foreground">Last updated: just now</p>
      </WidgetFooter>
    </Widget>
  ),
}

export const SizeSmall: Story = {
  render: () => (
    <Widget size="sm" className="w-[350px]">
      <WidgetHeader>
        <WidgetTitle>Small Widget</WidgetTitle>
      </WidgetHeader>
      <WidgetContent>
        <WidgetValue>42</WidgetValue>
      </WidgetContent>
    </Widget>
  ),
}

export const SizeMedium: Story = {
  render: () => (
    <Widget size="md" className="w-[350px]">
      <WidgetHeader>
        <WidgetTitle>Medium Widget</WidgetTitle>
      </WidgetHeader>
      <WidgetContent>
        <WidgetValue>1,284</WidgetValue>
        <WidgetLabel>Total devices</WidgetLabel>
      </WidgetContent>
    </Widget>
  ),
}

export const SizeLarge: Story = {
  render: () => (
    <Widget size="lg" className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <BarChart3 />
        </WidgetIcon>
        <WidgetTitle>Large Widget</WidgetTitle>
      </WidgetHeader>
      <WidgetContent>
        <WidgetValue>98.7%</WidgetValue>
        <WidgetLabel>Uptime this month</WidgetLabel>
      </WidgetContent>
      <WidgetFooter>
        <p className="text-xs text-muted-foreground">Target: 99.9%</p>
      </WidgetFooter>
    </Widget>
  ),
}

export const SizeXL: Story = {
  render: () => (
    <Widget size="xl" className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <BarChart3 />
        </WidgetIcon>
        <WidgetTitle>Extra Large Widget</WidgetTitle>
        <WidgetActions>
          <button type="button" aria-label="More options">
            <MoreVertical />
          </button>
        </WidgetActions>
      </WidgetHeader>
      <WidgetContent>
        <div className="flex flex-col gap-4">
          <div>
            <WidgetValue>2,847</WidgetValue>
            <WidgetLabel>Protected workloads</WidgetLabel>
          </div>
          <WidgetDivider />
          <div>
            <WidgetValue>156</WidgetValue>
            <WidgetLabel>Pending actions</WidgetLabel>
          </div>
        </div>
      </WidgetContent>
      <WidgetFooter>
        <p className="text-xs text-muted-foreground">Updated 5 minutes ago</p>
      </WidgetFooter>
    </Widget>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Widget interactive className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <TrendingUp />
        </WidgetIcon>
        <WidgetTitle>Clickable Widget</WidgetTitle>
      </WidgetHeader>
      <WidgetContent>
        <WidgetValue>+12.5%</WidgetValue>
        <WidgetLabel>Growth this quarter</WidgetLabel>
      </WidgetContent>
      <WidgetFooter>
        <p className="text-xs text-muted-foreground">Click to view details</p>
      </WidgetFooter>
    </Widget>
  ),
}

export const WithIconAndActions: Story = {
  render: () => (
    <Widget className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <Shield />
        </WidgetIcon>
        <WidgetTitle>Protection Status</WidgetTitle>
        <WidgetActions>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </WidgetActions>
      </WidgetHeader>
      <WidgetContent>
        <WidgetValue>All Clear</WidgetValue>
        <WidgetLabel>No issues detected</WidgetLabel>
      </WidgetContent>
    </Widget>
  ),
}

export const ValueDisplay: Story = {
  render: () => (
    <Widget className="w-[350px]">
      <WidgetHeader>
        <WidgetTitle>Revenue</WidgetTitle>
      </WidgetHeader>
      <WidgetContent>
        <WidgetValue>$45,231.89</WidgetValue>
        <WidgetLabel>+20.1% from last month</WidgetLabel>
      </WidgetContent>
    </Widget>
  ),
}

export const WithDivider: Story = {
  render: () => (
    <Widget className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <Activity />
        </WidgetIcon>
        <WidgetTitle>System Health</WidgetTitle>
      </WidgetHeader>
      <WidgetContent>
        <div className="flex items-center justify-between">
          <WidgetLabel>CPU Usage</WidgetLabel>
          <WidgetValue>32%</WidgetValue>
        </div>
      </WidgetContent>
      <WidgetDivider />
      <WidgetContent>
        <div className="flex items-center justify-between">
          <WidgetLabel>Memory</WidgetLabel>
          <WidgetValue>64%</WidgetValue>
        </div>
      </WidgetContent>
      <WidgetDivider />
      <WidgetContent>
        <div className="flex items-center justify-between">
          <WidgetLabel>Disk I/O</WidgetLabel>
          <WidgetValue>18%</WidgetValue>
        </div>
      </WidgetContent>
    </Widget>
  ),
}

export const Minimal: Story = {
  render: () => (
    <Widget className="w-[350px]">
      <WidgetContent>
        <p className="text-sm text-muted-foreground">
          A minimal widget with content only — no header or footer.
        </p>
      </WidgetContent>
    </Widget>
  ),
}

export const HeaderOnly: Story = {
  render: () => (
    <Widget size="sm" className="w-[350px]">
      <WidgetHeader>
        <WidgetIcon>
          <AlertTriangle />
        </WidgetIcon>
        <WidgetTitle>3 Alerts Require Attention</WidgetTitle>
        <WidgetActions>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </WidgetActions>
      </WidgetHeader>
    </Widget>
  ),
}

export const DashboardGrid: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Widget interactive>
        <WidgetHeader>
          <WidgetIcon>
            <Shield />
          </WidgetIcon>
          <WidgetTitle>Protected</WidgetTitle>
        </WidgetHeader>
        <WidgetContent>
          <WidgetValue>1,284</WidgetValue>
          <WidgetLabel>Workloads</WidgetLabel>
        </WidgetContent>
      </Widget>

      <Widget interactive>
        <WidgetHeader>
          <WidgetIcon>
            <AlertTriangle />
          </WidgetIcon>
          <WidgetTitle>Alerts</WidgetTitle>
        </WidgetHeader>
        <WidgetContent>
          <WidgetValue>7</WidgetValue>
          <WidgetLabel>Active alerts</WidgetLabel>
        </WidgetContent>
      </Widget>

      <Widget interactive>
        <WidgetHeader>
          <WidgetIcon>
            <TrendingUp />
          </WidgetIcon>
          <WidgetTitle>Storage</WidgetTitle>
        </WidgetHeader>
        <WidgetContent>
          <WidgetValue>3.2 TB</WidgetValue>
          <WidgetLabel>Used of 5 TB</WidgetLabel>
        </WidgetContent>
      </Widget>

      <Widget size="lg" className="col-span-2">
        <WidgetHeader>
          <WidgetIcon>
            <BarChart3 />
          </WidgetIcon>
          <WidgetTitle>Backup Success Rate</WidgetTitle>
          <WidgetActions>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </WidgetActions>
        </WidgetHeader>
        <WidgetContent>
          <p className="text-sm text-muted-foreground">Chart placeholder — visualization content area</p>
        </WidgetContent>
        <WidgetFooter>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </WidgetFooter>
      </Widget>

      <Widget size="lg">
        <WidgetHeader>
          <WidgetIcon>
            <Activity />
          </WidgetIcon>
          <WidgetTitle>Activity</WidgetTitle>
        </WidgetHeader>
        <WidgetContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <WidgetLabel>Backups</WidgetLabel>
              <span className="text-sm font-medium tabular-nums">248</span>
            </div>
            <div className="flex items-center justify-between">
              <WidgetLabel>Restores</WidgetLabel>
              <span className="text-sm font-medium tabular-nums">12</span>
            </div>
            <div className="flex items-center justify-between">
              <WidgetLabel>Failures</WidgetLabel>
              <span className="text-sm font-medium tabular-nums">3</span>
            </div>
          </div>
        </WidgetContent>
      </Widget>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex items-start gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Widget key={size} size={size} className="w-[200px]">
          <WidgetHeader>
            <WidgetTitle>Size: {size}</WidgetTitle>
          </WidgetHeader>
          <WidgetContent>
            <WidgetValue>123</WidgetValue>
            <WidgetLabel>Items</WidgetLabel>
          </WidgetContent>
        </Widget>
      ))}
    </div>
  ),
}
