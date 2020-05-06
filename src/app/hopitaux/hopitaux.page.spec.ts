import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HopitauxPage } from './hopitaux.page';

describe('HopitauxPage', () => {
  let component: HopitauxPage;
  let fixture: ComponentFixture<HopitauxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopitauxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HopitauxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
