import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RDVPage } from './rdv.page';

describe('RDVPage', () => {
  let component: RDVPage;
  let fixture: ComponentFixture<RDVPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDVPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RDVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
