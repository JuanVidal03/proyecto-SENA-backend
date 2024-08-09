import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt'


Usuario.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

// Método para comparar la contraseña
Usuario.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


