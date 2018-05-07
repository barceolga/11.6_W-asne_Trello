$(function() {

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
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
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
              var name = prompt("Enter the name of the card.");
                if (name == null || name == "") {
                  alert("User does not want to add a card.")
                } else {
                   self.addCard(new Card(name));
                }
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
      if (name == null || name =="") {
        alert("User does not want to creat a column.");
      } else {
        var column = new Column(name);
            board.addColumn(column);
      }

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
