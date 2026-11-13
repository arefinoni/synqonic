
import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "synqonic",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-13",
    observability: {
      enabled: true,
    },
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      WORKER_SELF_REFERENCE: bindings.worker({
        worker: "synqonic",
      }),
    },
  }),
});
