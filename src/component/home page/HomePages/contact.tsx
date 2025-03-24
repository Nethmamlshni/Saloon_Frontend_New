import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
    >
      <div className="bg-white text-black p-10 rounded-lg shadow-lg mt-20 mb-20 max-w-4xl mx-auto ">
        {/* Title Centered */}
        <h2 className="text-2xl font-bold text-center mb-6">Contact Me</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Left Section - Contact Info */}
          <div className="text-left">
            <p className="mb-4">
              If you have any questions or want to book an appointment, feel free to contact us!
            </p>

            {/* WhatsApp Numbers */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.a className=" font-medium flex items-center space-x-2" whileHover={{ scale: 1.2 }}>
                <i className="fab fa-whatsapp text-green-500 text-2xl"></i>
                <span>076 8511 941 | 078 863 9589</span>
              </motion.a>
            </motion.div>

            {/* WhatsApp Group Link */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
              <motion.a
                href="https://chat.whatsapp.com/BFGvkwm5LnEGitly14aKPk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.2 }}
              >
                <i className="fab fa-whatsapp  text-green-500 "></i>
                <span>Join Now </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Section - Location */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="font-semibold">We are located at:</p>
            <p>| Rabukpotha Road </p><p>| Near to Knuckles A Hostel </p>
            <p>| Open Daily </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
