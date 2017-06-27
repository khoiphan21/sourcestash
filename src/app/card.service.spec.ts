import { TestBed, inject } from '@angular/core/testing';

import { CardService } from './card.service';
import { AccountService } from './account.service';
import { HttpModule } from '@angular/http';
import { GoogleApiService } from './google-api.service';
import { Router } from '@angular/router';
import { Card } from './classes/card';
import { AppResponse } from './classes/response';

import * as _ from 'underscore';

describe('CardService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CardService,
                AccountService,
                { provide: GoogleApiService, useValue: { initialize: jasmine.createSpy('initialize') } },
                { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('It should create a card service.',inject([CardService],
        (service: CardService) => {
            expect(service).toBeTruthy();        
        }
    ));
    

    /**
     * 
     * Test for retrieving all the cards for a certain board
     * 
    */
    it('should successfully retrieve all sources for the test board', done => {
        inject([CardService], (service: CardService) => {
            service.getCardForBoard('id').then((cards:Card[]) =>{ 
                // If the cards.legth fits the requirement
                expect(cards.length).toBeTruthy();
                // If the length 
            })
        })
    })        
    
}); 