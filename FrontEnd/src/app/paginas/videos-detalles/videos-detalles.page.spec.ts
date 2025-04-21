import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideosDetallesPage } from './videos-detalles.page';

describe('VideosDetallesPage', () => {
  let component: VideosDetallesPage;
  let fixture: ComponentFixture<VideosDetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
