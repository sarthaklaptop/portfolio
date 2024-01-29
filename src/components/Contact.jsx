import React from 'react'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { fadeIn, slideIn } from '../utils/motion'
import toast from 'react-hot-toast'


// VITE_APP_EMAILJS_PUBLIC_KEY = 'dx8-WEaUyCzJfLb4n';
// VITE_APP_EMAILJS_TEMPLATE_ID = 'template_v3u1whi';
// VITE_APP_EMAILJS_SERVICE_ID = 'service_dutkpfp';

const Contact = () => {

  const formRef = useRef()
  const [form, setForm] = useState({
    name:"",
    email:"",
    message:"",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_dutkpfp',
        'template_v3u1whi',
        {
          from_name: form.name,
          to_name: "Sathak Patil",
          from_email: form.email,
          to_email: "sarthaktestingsmtp@gmail.com",
          message: form.message,
        },
        'dx8-WEaUyCzJfLb4n'
      )
      .then(
        () => {

          if(!form.name || !form.email || form.message) {
            alert("All fields are requied");
            setLoading(false);
            return;
          }
          setLoading(false);
          toast.success("Thank you. I will get back to you as soon as possible. ")
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
          toast.error("Something went Wrong.")
        }
      );
  }

  return (
    <div className='xs:mt-12 flex xl:flex-row flex-col-reverse 
    gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'twin', 0.2, 1)}
        className='flex-[0.75] bg-black-100 rounded-2xl p-8'
      >
        <p className={styles.sectionSubText}>Get in Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form 
          onSubmit={handleSubmit}
          ref={formRef}
          className='mt-12 flex flex-col gap-8'>
            
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your Email"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary 
              text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>What's your message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
          type='submit'
          className='bg-tertiary py-3 px-8 outline-none w-fit text-white 
          shadow-md shadow-primary rounded-xl'>
            {loading ? 'Sending...' : "Sent"}
          </button>
        </form>

      </motion.div>

      <motion.div
        variants={slideIn('right', 'twin', 0.2, 1)}
        className='xs:flex-1 xl:h-auto md:h-[550px] h-[350px] '
      >
        <EarthCanvas/> 
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");