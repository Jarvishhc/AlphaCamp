var should = chai.should()

describe('Test fizzBuzz function', function () {
  it('should return "Fizz" when input number can be divided by 3', function () {
    let result = fizzBuzz(9)
    result.should.be.deep.equal('Fizz')
  })
  it('should return "Buzz" when input number can be divided by 5', function () {
    let result = fizzBuzz(10)
    result.should.be.deep.equal('Buzz')
  })
  it('should return "FizzBuzz" when input number can be divided by both 3 and 5', function () {
    let result = fizzBuzz(15)
    result.should.be.deep.equal('FizzBuzz')
  })
  it('should return the input number when the number cannot be divided by 3 or 5 or both', function () {
    let result = fizzBuzz(8)
    result.should.be.equal(8)
  })

})