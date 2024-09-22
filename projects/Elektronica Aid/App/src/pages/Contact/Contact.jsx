import React from 'react';
import style from './Contact.module.css';

const Contact = () => {
    return (
        <div className={style.contact}>
            <div className={style.contact_container}>
                <h2>Contacteer ons</h2>
                <p>
                    Heb je vragen of opmerkingen? Neem gerust contact met ons op
                    via onze contactgegevens. We horen graag van je!
                </p>

                <table className={style.contact_table}>
                    <tbody>
                        <tr>
                            <td className={style.contact_label}>Adres:</td>
                            <td className={style.contact_info}>
                                Bleekmeersstraat 39, 9160 Lokeren
                            </td>
                        </tr>
                        <tr>
                            <td className={style.contact_label}>Telefoon:</td>
                            <td className={style.contact_info}>
                                0489 06 14 99 (10 uur - 22 uur 7/7)
                            </td>
                        </tr>
                        <tr>
                            <td className={style.contact_label}>E-mail:</td>
                            <td className={style.contact_info}>
                                info@elektronica-aid.be
                            </td>
                        </tr>
                        <tr>
                            <td className={style.contact_label}>Openingsuren:</td>
                            <td className={style.contact_info}>
                                
                            </td>
                        </tr>
                        <tr>
                            <td className={style.contact_label}>Maandag-Zondag:</td>
                            <td className={style.contact_info}>
                                10 uur - 22 uur
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={style.map}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.0646812399946!2d4.001426576494338!3d51.107266771725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c39ad3928ab389%3A0xbe49b5360a584beb!2sBleekmeersstraat%2039%2C%209160%20Lokeren!5e0!3m2!1snl!2sbe!4v1717424371946!5m2!1snl!2sbe"
                    
                    
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;