import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonDossierPage } from './mon-dossier.page';

describe('MonDossierPage', () => {
  let component: MonDossierPage;
  let fixture: ComponentFixture<MonDossierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonDossierPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonDossierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
