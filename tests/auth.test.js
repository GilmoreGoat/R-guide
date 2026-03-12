import { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import jwt from 'jsonwebtoken';
import { authenticateToken, JWT_SECRET } from '../server.js';

describe('authenticateToken Middleware', () => {
    it('should return 401 if no authorization header is present', () => {
        const req = { headers: {} };
        const res = {
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.body = data;
                return this;
            }
        };
        const next = mock.fn();

        authenticateToken(req, res, next);

        assert.strictEqual(res.statusCode, 401);
        assert.deepStrictEqual(res.body, { error: 'Access denied' });
        assert.strictEqual(next.mock.callCount(), 0);
    });

    it('should return 401 if authorization header is present but no token', () => {
        const req = { headers: { 'authorization': 'Bearer ' } };
        const res = {
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.body = data;
                return this;
            }
        };
        const next = mock.fn();

        authenticateToken(req, res, next);

        assert.strictEqual(res.statusCode, 401);
        assert.deepStrictEqual(res.body, { error: 'Access denied' });
        assert.strictEqual(next.mock.callCount(), 0);
    });

    it('should return 403 if token is invalid', () => {
        const req = { headers: { 'authorization': 'Bearer invalid-token' } };
        const res = {
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.body = data;
                return this;
            }
        };
        const next = mock.fn();

        // Stub jwt.verify
        const originalVerify = jwt.verify;
        const mockedVerify = mock.fn((token, secret, cb) => {
            cb(new Error('Invalid token'), null);
        });
        jwt.verify = mockedVerify;

        try {
            authenticateToken(req, res, next);
            assert.strictEqual(res.statusCode, 403);
            assert.deepStrictEqual(res.body, { error: 'Invalid token' });
            assert.strictEqual(next.mock.callCount(), 0);
            assert.strictEqual(mockedVerify.mock.callCount(), 1);
        } finally {
            jwt.verify = originalVerify;
        }
    });

    it('should call next() and set req.user if token is valid', () => {
        const user = { id: 1, username: 'testuser' };
        const req = { headers: { 'authorization': 'Bearer valid-token' } };
        const res = {
            status: function() { return this; },
            json: function() { return this; }
        };
        const next = mock.fn();

        // Stub jwt.verify
        const originalVerify = jwt.verify;
        const mockedVerify = mock.fn((token, secret, cb) => {
            cb(null, user);
        });
        jwt.verify = mockedVerify;

        try {
            authenticateToken(req, res, next);
            assert.strictEqual(next.mock.callCount(), 1);
            assert.deepStrictEqual(req.user, user);
            assert.strictEqual(mockedVerify.mock.callCount(), 1);
            assert.strictEqual(mockedVerify.mock.calls[0].arguments[1], JWT_SECRET);
        } finally {
            jwt.verify = originalVerify;
        }
    });
});
