import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionItemComponent } from './publicacion-item.component';

describe('PublicacionItemComponent', () => {
  let component: PublicacionItemComponent;
  let fixture: ComponentFixture<PublicacionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
