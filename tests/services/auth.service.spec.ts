import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CheckEmailRequestModel } from "src/app/models/user-requests.model";
import { AuthService } from '../../src/app/services/auth.service';
import { environment } from '../../src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('debe retornar checkEmail',(doneFn)=> {
    const mockData : CheckEmailRequestModel = {
      email: 'agus@gmail.com'
    }
    const email = 'agus@gmail.com';
    // service.checkEmail(email)
    //   .subscribe((data) =>{
    //      expect(data).toEqual(mockData);
    // });
    const url= `${environment.api.link}/api/v1/user?checkEmail=${email}`;
    const req = httpController.expectOne(url);
    req.flush(mockData);
    const params = req.request.params;
    expect(params.get('email')).toEqual(`${email}`);
    httpController.verify();
  });
});
