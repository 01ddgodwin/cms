var express = require('express');
var router = express.Router();
module.exports = router;
const SequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');
const sequenceGenerator = require('./sequenceGenerator');

router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .then((contacts) => {
      res.status(200).json({
        contact: 'Contacts fetched successfully!',
        contacts: contacts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        contact: 'An error orccured',
        error: error,
      });
    });
});

router.post('/', (req, res, next) => {

  const maxContactId = sequenceGenerator.nextId('contacts');

  const Contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        contact: 'Contact added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
      res.status(500).json({
        contact: 'An error occured',
        error: error
      });
    });
});


router.put('/:id', (req, res, next) => {
    Contact.findOne({id: req.params.id})
    .then(contact => {
        contact.name = req.body.name;
        contact.description = req.body.description;
        contact.url = req.body.url;

        Contact.updateOne({id: req.params.id}, contact)
        .then(result => {
            res.status(204).json({
                contact: 'Contact updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                contact: 'An error occured',
                error: error
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            contact: 'Contact not found.',
            error: {contact: 'Contact not found'}
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Contact.findOne({id: req.params.id})
    .then(contact => {
        Contact.deleteOne({id: req.params.id})
        .then(result => {
            res.status(204).json({
                contact: 'Contact deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                contact: 'An error occured',
                error: error
            });
        })
    })
    .catch(error => {
        res.status(500).json({
            contact: 'Contact not found.',
            error: {contact: 'Contact not found'}
        });
    });
});