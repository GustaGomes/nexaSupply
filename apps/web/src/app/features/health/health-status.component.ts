import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { finalize } from 'rxjs';

import { HealthApiService } from '../../core/api/health-api.service';

type HealthState = 'idle' | 'loading' | 'available' | 'unavailable';

@Component({
  selector: 'app-health-status',
  imports: [ButtonModule, InputTextModule, MessageModule, ReactiveFormsModule],
  templateUrl: './health-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthStatusComponent {
  private readonly healthApi = inject(HealthApiService);
  readonly state = signal<HealthState>('idle');
  readonly checking = computed(() => this.state() === 'loading');
  readonly environmentForm = new FormGroup({
    label: new FormControl('local', { nonNullable: true, validators: [Validators.required] })
  });

  check(): void {
    this.state.set('loading');
    this.healthApi
      .getHealth()
      .pipe(finalize(() => this.environmentForm.enable()))
      .subscribe({
        next: () => this.state.set('available'),
        error: () => this.state.set('unavailable')
      });
  }
}

