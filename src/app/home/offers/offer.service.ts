import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpService } from '../../core/http.service';
import { ApiEndpoint } from '../shared/api-endpoint.model';

import { CreateOffer } from './offer.model';
import { Offer } from './offer.model';

@Injectable()
export class OfferService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<Offer[]> {
    return this.httpService.get(ApiEndpoint.OFFERS);
  }

  create(offer: CreateOffer): Observable<Offer> {
    return this.httpService.post(ApiEndpoint.OFFERS, offer);
  }

  delete(offer: Offer): Observable<any> {
    return this.httpService.delete(ApiEndpoint.OFFERS + '/' + offer.id);
  }

  search(params): Observable<Offer[]> {
    let pathParams = 'status=' + params.activeOffers;
    pathParams = params.id !== null ? pathParams + '&id=' + params.id : pathParams;
    pathParams = params.offername !== null ? pathParams + '&offername=' + params.offername : pathParams;
    pathParams = params.idArticle !== null ? pathParams + '&idArticle=' + params.idArticle : pathParams;
    return this.httpService.get(ApiEndpoint.OFFERS + ApiEndpoint.SEARCH + '?' + pathParams);
  }
}
