<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/images/logo.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <title>Alspace</title>
  <link rel="manifest" href="/manifest.json">
  @if (config('app.env') === 'local')
  <script type="module">
    import RefreshRuntime from "{{ env('DEV_SERVER_URL', 'http://localhost:3000') }}/@@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  @endif

  <script>
    window.user = @json($user);
    window.payload = @json($payload);
    window.BROADCASTER = @json(config('broadcasting.default'));
    window.PUSHER_APP_KEY = @json(config('broadcasting.connections.pusher.key'));
    window.PUSHER_APP_CLUSTER = @json(config('broadcasting.connections.pusher.options.cluster'));
    window.PUSHER_APP_HOST = @json(config('broadcasting.connections.pusher.options.client_host'));
    window.PUSHER_APP_PORT = @json(config('broadcasting.connections.pusher.options.port'));
  </script>

  <!-- Scripts and CSS import -->
  @vite
</head>

<body class="font-sans" style='margin-bottom: 0'>
  <div id="root"></div>
</body>

</html>