# @widy/react

React hooks and context for seamless Widy widget integration.

## Installation

```bash
npm install @widy/react
```

## Usage


```tsx
import { WidgetOutboundBridge } from "@widy/sdk";
import { BridgeContext } from '@widy/react';

const bridge = new WidgetOutboundBridge();

function App() {
  return (
    <BridgeContext.Provider value={bridge}>
      <MyWidget />
    </BridgeContext.Provider>
  );
}
```

### Using the Bridge Hook

Access the bridge instance directly:

```tsx
import { useBridge } from '@widy/react';

function MyComponent() {
  const bridge = useBridge();
  // Use bridge methods
}
```

### Performing Widget Actions

Use the `useWidgetMutation` hook to execute mutations:

```tsx
import { useWidgetMutation } from '@widy/react';

function MyComponent() {
  const { data, loading, error, trigger } = useWidgetMutation({
    scope: 'widgets:goals.create',
  });

  const handleCreate = async () => {
    try {
      const result = await trigger({ type: 'donation', amount: 100 });
      console.log('Created:', result);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <button onClick={handleCreate} disabled={loading}>
        {loading ? 'Creating...' : 'Create Goal'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
```

### Querying Widget Data

Use the `useWidgetQuery` hook to fetch data:

```tsx
import { useWidgetQuery } from '@widy/react';

function MyComponent() {
  const { data, loading, error, refetch } = useWidgetQuery({
    scope: 'widgets:goals.read',
    arg: { type: 'donation' },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
}
```

### Subscribing to Widget Events

Use the `useWidgetSubscription` hook to listen for events:

```tsx
import { useWidgetSubscription } from '@widy/react';

function MyComponent() {
	useWidgetSubscription<ISettings>(
		"widgets:settings.subscription",
		(settings) => {
			console.log(settings);
		},
	);
  return <div>Listening for events...</div>;
}
```

## API

### Hooks

- `useBridge()`: Returns the bridge instance. Must be used within a `BridgeContext.Provider`.
- `useWidgetMutation<A, R>(options)`: Performs a widget mutation and returns `{ trigger, loading, error, data }`.
- `useWidgetQuery<A, R>(options)`: Performs a widget query and returns `{ data, loading, error, refetch }`.
- `useWidgetSubscription<T>(scope, handler)`: Subscribes to widget events.

### Context

- `BridgeContext`: React context for the widget bridge.

## Peer Dependencies

- React ^18.0.0 || ^19.0.0

## Dependencies

- @widy/sdk ^1.0.1

## License

ISC

ISC