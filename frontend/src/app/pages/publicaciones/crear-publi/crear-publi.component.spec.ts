import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPubliComponent } from './crear-publi.component';

describe('CrearPubliComponent', () => {
  let component: CrearPubliComponent;
  let fixture: ComponentFixture<CrearPubliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPubliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
