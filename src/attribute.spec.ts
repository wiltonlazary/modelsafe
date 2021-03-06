/* tslint:disable:completed-docs */
import * as chai from 'chai';

import { attr, InternalAttributeType, STRING, CHAR, TEXT,
         INTEGER, BIGINT, FLOAT, REAL,
         DOUBLE, DECIMAL, BOOLEAN, TIME,
         DATE, JSON, JSONB, BLOB,
         ENUM, ARRAY } from './attribute';

import { getAttributes } from './metadata';
import { model, Model } from './model';

@model()
export class Entity extends Model {
  @attr(STRING)
  name: string;
}

describe('@attr', () => {
  it('should define correctly', () => {
    let attrs = getAttributes(Entity);

    chai.assert.deepEqual(attrs['name'], { type: STRING, readOnly: false });
  });
});

describe('AttributeType', () => {
  const genericTests = {
    STRING: [InternalAttributeType.STRING, STRING],
    CHAR: [InternalAttributeType.CHAR, CHAR],
    TEXT: [InternalAttributeType.TEXT, TEXT],
    INTEGER: [InternalAttributeType.INTEGER, INTEGER],
    BIGINT: [InternalAttributeType.BIGINT, BIGINT],
    FLOAT: [InternalAttributeType.FLOAT, FLOAT],
    REAL: [InternalAttributeType.REAL, REAL],
    DOUBLE: [InternalAttributeType.DOUBLE, DOUBLE],
    DECIMAL: [InternalAttributeType.DECIMAL, DECIMAL],
    BOOLEAN: [InternalAttributeType.BOOLEAN, BOOLEAN],
    TIME: [InternalAttributeType.TIME, TIME],
    DATE: [InternalAttributeType.DATE, DATE],
    JSON: [InternalAttributeType.JSON, JSON],
    JSONB: [InternalAttributeType.JSONB, JSONB],
    BLOB: [InternalAttributeType.BLOB, BLOB]
  };

  for (let key of Object.keys(genericTests)) {
    let [internalType, externalType] = genericTests[key];

    describe(`#${key}`, () => {
      it('should instantiate correctly', () => {
        chai.assert.deepEqual(externalType, {
          type: internalType
        });
      });
    });
  }

  describe('#ENUM', () => {
    it('should instantiate correctly', () => {
      chai.assert.deepEqual(ENUM(['a', 'b', 'c']), {
        type: InternalAttributeType.ENUM,
        options: { values: ['a', 'b', 'c'] }
      });
    });
  });

  describe('#ARRAY', () => {
    it('should instantiate correctly', () => {
      chai.assert.deepEqual(ARRAY(STRING), {
        type: InternalAttributeType.ARRAY,
        options: { contained: STRING }
      });
    });

    it('should instantiate recursive correctly', () => {
      chai.assert.deepEqual(ARRAY(ARRAY(STRING)), {
        type: InternalAttributeType.ARRAY,
        options: {
          contained: {
            type: InternalAttributeType.ARRAY,
            options: { contained: STRING }
          }
        }
      });
    });
  });
});
