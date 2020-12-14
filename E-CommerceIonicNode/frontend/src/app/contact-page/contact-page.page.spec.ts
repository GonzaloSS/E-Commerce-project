import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactPagePage } from './contact-page.page';

describe('ContactPagePage', () => {
  let component: ContactPagePage;
  let fixture: ComponentFixture<ContactPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
