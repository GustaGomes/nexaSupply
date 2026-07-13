import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HealthStatusComponent } from './features/health/health-status.component';

@Component({
  selector: 'app-root',
  imports: [HealthStatusComponent],
  template: `
    <main class="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <header class="mb-8">
        <p class="font-semibold tracking-wide text-indigo-700">NEXASUPPLY</p>
        <h1 class="mt-2 text-3xl font-bold text-slate-950">Fundação da plataforma</h1>
      </header>
      <app-health-status />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}

