import { AirplaneSeating, isValid2dArray, isNonNegativeInteger, isRowsAndColsLessThan } from './airplane_seat.js';

import chai from 'chai';
const expect = chai.expect;



describe('isValid2dArray', () => {
  it('should return false if input is not a valid 2d array', () => {
    expect(isValid2dArray([1, 2])).to.be.false;
    expect(isValid2dArray([[1, 2], ['3', 4]])).to.be.false;
  });

  it('should return true if input is a valid 2d array', () => {
    expect(isValid2dArray([[1, 2]])).to.be.false;
    expect(isValid2dArray([[1, 2], [3, 4]])).to.be.true;
  });
});

describe('isNonNegativeInteger', () => {
  it('should return false if input is not a non-negative integer', () => {
    expect(isNonNegativeInteger(-1)).to.be.false;
    expect(isNonNegativeInteger('a')).to.be.false;
    expect(isNonNegativeInteger('')).to.be.false;
  });

  it('should return true if input is non-negative safe int', () => {
    expect(isNonNegativeInteger(1)).to.be.false;
    expect(isNonNegativeInteger(2 ** 53 - 1)).to.be.false;
  });
});

describe('isRowsAndColsLessThan', () => {
  it('should return false if rows and columns are more than limits', () => {
    const rows = 2;
    const cols = 2;
    const maxRows = 1;
    const maxCols = 2;
    expect(isRowsAndColsLessThan(rows, cols, maxRows, maxCols)).to.be.false;
  });
  it('should return true if rows and columns are less than limits', () => {
    const rows = 2;
    const cols = 2;
    const maxRows = 3;
    const maxCols = 3;
    expect(isRowsAndColsLessThan(rows, cols, maxRows, maxCols)).to.be.false;
  });
});


describe('Validate Input for seats', () => {
    it('throw if input is empty array', () => {
      expect(() => {
        new AirplaneSeating([]);
      }).to.throw();
    });
  
    it('throw if input is not a 2d array', () => {
      expect(() => {
        new AirplaneSeating([1, 2]);
      }).to.throw();
    });
  
    it('not throw if input is a 2d array with numbers', () => {
      expect(() => {
        new AirplaneSeating([1, 2], [3, 4]);
      }).to.be.true;
    });
  
    it('throw if input is a 2d array with non-numbers', () => {
      expect(() => {
        new AirplaneSeating([1, 2], ['2', 3]);
      }).to.throw();
    });
  });
  
  describe('Validate input for passengers', () => {
    it('throw if passengers is negative number', () => {
      expect(() => {
        new AirplaneSeating([[1, 2], [2, 3], -1]);
      }).to.throw();
    });
  
    it('should return number of passengers via method on valid input', () => {
      const myAirplane = new AirplaneSeating([[1, 2], [3, 4]], 5);
      expect(myAirplane.passengers).to.be(5);
    });
  });
  
  describe('Create seats', () => {
    it('should return an array of seats', () => {
      const airplane = new AirplaneSeating([[3, 1], [2, 2], [2, 1]]);
      expect(airplane.seats).to.equal([
        ['seat', 'seat', 'seat', 'aisle', 'seat', 'seat', 'aisle', 'seat', 'seat'],
        ['empty', 'empty', 'empty', 'aisle', 'seat', 'seat', 'aisle', 'empty', 'empty'],
      ]);
    });
  });
  
  describe('Assign aisle seats', () => {
    it('should return assigned aisle seats', () => {
      const airplane = new AirplaneSeating([[3, 1], [2, 2]], 5);
      airplane._asignAisleSeats();
      expect(airplane.assignedSeats).to.equal([
        ['seat', 'seat', 1, 'aisle', 2, 'seat'],
        ['empty', 'empty', 'empty', 'aisle', 3, 'seat'],
      ]);
    });
  
    it('should return assigned aisle seats only for the number of passengers', () => {
      const airplane = new AirplaneSeating([[2, 1], [2, 1], [2, 1]], 2);
      airplane._asignAisleSeats();
      expect(airplane.assignedSeats).to.equal([
        ['seat', 1, 'aisle', 2, 'seat', 'aisle', 'seat', 'seat'],
      ]);
    });
  });
  
  describe('Assign window seats', () => {
    it('should return assigned window seats', () => {
      const airplane = new AirplaneSeating([[3, 1], [2, 2]], 5);
      airplane._assignWindowSeats();
      expect(airplane.assignedSeats).to.equal([
        [1, 'seat', 'seat', 'aisle', 'seat', 2],
        ['empty', 'empty', 'empty', 'aisle', 'seat', 3],
      ]);
    });
  
    it('should return assigned window seats only for the number of passengers', () => {
      const airplane = new AirplaneSeating([[2, 2], [2, 1], [2, 1]], 2);
      airplane._assignWindowSeats();
      expect(airplane.assignedSeats).to.equal([
        [1, 'seat', 'aisle', 'seat', 'seat', 'aisle', 'seat', 2],
        ['seat', 'seat', 'aisle', 'empty', 'empty', 'aisle', 'empty', 'empty'],
      ]);
    });
  });
  
  describe('Assign middle seats', () => {
    it('should return assigned middle seats', () => {
      const airplane = new AirplaneSeating([[3, 1], [2, 2]], 5);
      airplane._asignMiddleSeats();
      expect(airplane.assignedSeats).to.equal([
        ['seat', 1, 'seat', 'aisle', 'seat', 'seat'],
        ['empty', 'empty', 'empty', 'aisle', 'seat', 'seat'],
      ]);
    });
  
    it('should return assigned middle seats only for the number of passengers', () => {
      const airplane = new AirplaneSeating([[4, 1], [5, 1]], 2);
      airplane._asignMiddleSeats();
      expect(airplane.assignedSeats).to.equal([
        ['seat', 1, 2, 'seat', 'aisle', 'seat', 'seat', 'seat', 'seat', 'seat'],
      ]);
    });
  });
  
  describe('Assign all seats', () => {
    it('should  return assigned seats and remaining passengers', () => {
      const airplane = new AirplaneSeating([[3, 2], [2, 2], [3, 2]], 17);
      airplane._assignAllSeats();
      expect(airplane.assignedSeats).to.equal([
        [9, 13, 1, 'aisle', 2, 3, 'aisle', 4, 14, 10],
        [11, 15, 5, 'aisle', 6, 7, 'aisle', 8, 16, 12],
      ]);
      expect(airplane.remainingPassengers).to.be(1);
    });
  
    it('should return assign seats only for the number of passengers', () => {
      const airplane = new AirplaneSeating([[4, 1], [5, 1]], 5);
      airplane._assignAllSeats();
      expect(airplane.assignedSeats).to.equal([
        [3, 5, 'seat', 1, 'aisle', 2, 'seat', 'seat', 'seat', 4],
      ]);
    });
  });
  
  describe('Get auto assigned seats', () => {
    it('should return an object with assigned seats and remaining passengers', () => {
      const airplane = new AirplaneSeating([[4, 1], [5, 1]], 5);
      expect(airplane.autoAssignedSeats).to.equal({
        remainingPassengers: 0,
        seats: [[3, 5, 'seat', 1, 'aisle', 2, 'seat', 'seat', 'seat', 4]],
      });
    });
  });
