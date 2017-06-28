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
     * Test for retrieving all the cards for a certain board
    */
    it('should successfully retrieve all sources for the test board', done => {
        inject([CardService], (service: CardService) => {
            service.getCardForBoard('id').then((cards:Card[]) =>{ 
                // If the cards.legth fits the requirement
                expect(cards).toBeTruthy();

                done();
            }).catch(error => {
                console.log(error);
                fail('error should not be thrown');
                done();
            })
        })();
    // set timeout
    }, 10000);        
    
    /**
     * Test for updating cards
    */

    it('should update a card correctly', done => {
        inject([CardService], (service: CardService) => {
            let board_id = '332211';
            let card = new Card('242267', board_id, 'Indo', 0, 0);
            // setup the copy card
            let cardCopy = new Card('242267', board_id,'Greek', // changed
                100, // changed
                100 // changed
                )
            // Add a card first
            service.addNewCard(card.board_id, card.title, card.x_location, card.y_location).then(databaseCard => {
                card.card_id = databaseCard.card_id;
                cardCopy.card_id = databaseCard.card_id;

                expect(databaseCard).toBeTruthy();

            // Try to update the card
            return service.updateCard(cardCopy);
            }).then((response: AppResponse) => {
                expect(response.success).toBeTruthy();

            // Retrieve the card and check details
            return service.getCardForBoard(board_id)
            }).then((cards: Card[]) => {
                _.each(cards, (databaseCard: Card) => {
                    if (databaseCard.card_id === cardCopy.card_id) {
                        // NOT SURE IF THIS IS RIGHT OR WRONG
                        expect(databaseCard.title).toBe(cardCopy.title);
                    }
                });
                return service.deleteCard(cardCopy.card_id);
            }).then((response: AppResponse) => {
                expect(response.success).toBeTruthy();
                done();
            }).catch(error => {
                fail(new AppResponse(false, 'error should not have occured', error));
                done();
            })
        })();
    }, 10000);
}); 