$(function() {
/*
  var supportedFlag = $.keyframe.isSupported();
  $.keyframe.debug = true;

 $.keyframe.define([{
    name: 'card-animation',
    '0%': {
        'background-color': '#D7BCEC',
        'color' : '#5F2900',
        'transform': 'matrix(1, 0, 0, 1, 0, 0 )'
    },
    '25%': {
        'background-color': '#ac74d8',
        'color' : '#cc5800',
        'transform': 'matrix(1.25, 0, 0.25, 1.25, 0, 0 )'
    },
    '50%': {
        'background-color': '#ac74d8',
        'color' : '#ffb780',
        'transform': 'matrix(1.5, 0, 0.5, 1.5, 0, 0 )'
    },
    '75%': {
        'background-color': '#ac74d8',
        'color' : '#cc5800',
        'transform': 'matrix(1.25, 0, 0.25, 1.25, 0, 0 )'
    },
    '100%': {
        'background-color': '#D7BCEC',
        'color' : '#5F2900',
        'transform': 'matrix(1, 0, 0, 1, 0, 0 )'
    }
 }]);*/

  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function initSortable() {
    var self = this;
    $('.column-card-list').sortable({
      delay: 150,
      opacity: 0.4,
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
      change: function( click, item ) {
        self.$('.column-card-list .card').addClas('card-animated');

        /*playKeyframe({
          name: "card-animation",
          duration: "1s",
          timingFunction: 'ease',
          direction: 'normal',
          fillMode: 'forwards',
          complete: increment
        });*/
      }
    }).disableSelection();

  }

  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('column-btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');

      //ADDING EVENTS

      $columnDelete.click(function() {
            self.removeColumn();
      });
      //Add a note after clicking on the button:
          $columnAddCard.click(function() {
            self.addCard(new Card(prompt("Enter the name of the card.")));
          });

      // CONSTRUCTION COLUMN ELEMENT
      $column.append($columnTitle)
              .append($columnDelete)
              .append($columnAddCard)
              .append($columnCardList);
          return $column;
    }
  }

  Column.prototype = {
      addCard: function(card) {
        this.$element.children('ul').append(card.$element);
      },
      removeColumn: function() {
        this.$element.remove();
      }
  };

  function Card(description) {

    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      // CREATING THE BLOCKS
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('card-btn-delete').text('x');

      // BINDING TO CLICK EVENT
      $cardDelete.click(function(){
            self.removeCard();
      });

      // COMBINING BLOCKS AND RETURNING THE CARD
      $card.append($cardDelete)
          .append($cardDescription);

      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  };

  var board = {

      name: 'Kanban Board',
      addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
      },
      $element: $('#board .column-container')
  };

  $('.create-column')
    .click(function() {
      var name = prompt('Enter a column name');
      var column = new Column(name);
          board.addColumn(column);
    });

  // CREATING COLUMNS
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');
  // GETTING THE PLACEHOLDER OPITON

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

  //ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
});
