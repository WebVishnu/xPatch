"use client";
import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import $ from "jquery";
// fonts
import { Roboto_Mono } from "next/font/google";
const roboto_mono = Roboto_Mono({ subsets: ["latin"], weight: ["700", "400"] });
import { Inter } from "next/font/google";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
const inter = Inter({ subsets: ["latin"], weight: ["600"] });

// Schema for form validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  number: yup.string().required("Mobile num is required"),
  //   budget: yup.string(),
  //   category: yup.string().required("Please Select Category"),
  //   companyName: yup.string().required("Company name is required"),
  description: yup.string().required("Description name is required"),
});

const Form = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // handling sign in
  const contactUs = async (data) => {
    try {
      $(".submitBtn")
        .html(
          `
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-black animate-spin dark:text-black fill-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>`
        )
        .attr("type", "button");
      axios
        .post(`/api/contact`, {
          Name: data.name,
          Email: data.email,
          Number: data.number,
          //   Budget: data.budget,
          //   Category: data.category,
          //   CompanyName: data.companyName,
          Description: data.description,
        })
        .then((res) => {
          console.log($(".video"));
          $(".form").css({ display: "none" });
          $(".video-div").removeClass("hidden").addClass("flex");
          $(".video").trigger("play");
          console.log(res);

          reset();
        })
        .catch((e) => {
          $(".form").css({ display: "none" });
          $(".video-div").removeClass("hidden").addClass("flex");
          $(".video").trigger("play");
          reset();
          console.log(e);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div
      className={`${roboto_mono.className} max-w-[1400px] xl:w-[1400px] px-[1.5em]`}
    >
      <div className="hidden flex-col justify-center video-div h-full w-full items-center">
        <video muted className="video user-select-none h-72 w-72">
          <source src={"/videos/formSubmitted.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className=" md:w-1/2 text-3xl pb-2 bg-clip-text relative bottom-[50px] text-center font-bold">
          Thanks for applying. <br /> Our team will contact you soon!!
        </h1>
      </div>
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, y: "-50px" }}
        whileInView={{ opacity: 1, y: "0" }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className=" flex justify-between lg:flex-nowrap flex-wrap form"
      >
        <div className="lg:w-1/2 me-12">
          <h1 className="md:text-6xl text-3xl pb-2 bg-clip-text font-bold">
            Get a Free Landing Page in 5-10 Days!
          </h1>
          <p className="mt-5 md:text-md text-sm lg:mb-0 mb-12">
            Fill out the form and we&rsquo;ll design and develop a custom landing page
            for you, free of charge. Your landing page will be ready to go live
            in just 5-10 days!
          </p>
          {/* <div className="flex lg:flex-col flex-row lg:items-start items-center lg:my-0 my-5">
            <h6 className=" lg:mt-5 lg:mb-3">Follow Us:</h6>
            <p className="flex justify-between w-28 lg:ms-0 ms-3">
              {" "}
              <BsTwitter className="cursor-pointer hover:text-[#FF72AC] text-xl transition-all " />{" "}
              <BsInstagram className="cursor-pointer hover:text-[#FF72AC] text-xl transition-all " />{" "}
              <BsLinkedin className="cursor-pointer hover:text-[#FF72AC] text-xl transition-all " />
            </p>
          </div> */}
        </div>
        <form
          onSubmit={handleSubmit(contactUs)}
          className="max-w-[700px] xl:w-[700px] md:px-[.5em] form"
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className={`${inter.className} my-2 border font-light outline-none  border-[#535353] bg-[#393939] w-full rounded-md py-3 px-5 text-[#8B8A8B]`}
                placeholder="Name"
                {...field}
              />
            )}
          />
          {errors.name && (
            <span className="text-red-700">{errors.name.message}</span>
          )}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className={`${inter.className} my-2 border font-light outline-none  border-[#535353] bg-[#393939] w-full rounded-md py-3 px-5 text-[#8B8A8B]`}
                placeholder="Email"
                {...field}
              />
            )}
          />
          {errors.email && (
            <span className="text-red-700">{errors.email.message}</span>
          )}
          <Controller
            name="number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className={`${inter.className} my-2 border font-light outline-none  border-[#535353] bg-[#393939] w-full rounded-md py-3 px-5 text-[#8B8A8B]`}
                placeholder="Mobile number"
                {...field}
              />
            )}
          />
          {errors.number && (
            <span className="text-red-700">{errors.number.message}</span>
          )}
          {/* <Controller
            name="budget"
            control={control}
            defaultValue="null"
            render={({ field }) => (
              <select
                className=" my-2 border-2 border-black w-full rounded-md py-3 px-5 text-[#7e7e7e]"
                {...field}
              >
                <option value="Null">Budget (Optional)</option>
                <option value="1000">Less than $1,000</option>
                <option value="$1000 - $5000">$1,000 - $5,000</option>
                <option value="$5000 - $1000">$5,000 - $10,000</option>
                <option value="$10000 - $20000">$10,000 - $20,000</option>
                <option value="$20,000 +">$20,000 +</option>
              </select>
            )}
          />
          {errors.budget && (
            <span className="text-red-700">{errors.budget.message}</span>
          )}
          <Controller
            name="category"
            control={control}
            defaultValue="Start a new Brand"
            render={({ field }) => (
              <select
                className=" my-2 border-2 border-black w-full rounded-md py-3 px-5 text-[#7e7e7e]"
                {...field}
              >
                <option value="Start a new Brand">Start a new Brand</option>
                <option value="Optimise my brand">Optimise my brand</option>
              </select>
            )}
          />
          {errors.category && (
            <span className="text-red-700">{errors.category.message}</span>
          )}
          <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className={`${inter.className} my-2 border-2  border-black w-full rounded-md py-3 px-5 text-[#7e7e7e]`}
                placeholder="Company name"
                {...field}
              />
            )}
          />
          {errors.companyName && (
            <span className="text-red-700">{errors.companyName.message}</span>
          )} */}
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                className={`${inter.className} resize-none my-2 border font-light outline-none  border-[#535353] bg-[#393939] w-full rounded-md py-3 px-5 text-[#8B8A8B]`}
                rows={4}
                placeholder="Describe your project. eg- Company Name, Niche"
                {...field}
              />
            )}
          />
          {errors.description && (
            <span className="text-red-700">{errors.description.message}</span>
          )}
          <button
            type="submit"
            className={`${inter.className} flex justify-center items-center submitBtn my-2 border-2 bg-[#fff] border-[#535353]  w-full rounded-md py-3 px-5 text-[#000]`}
          >Queue your Project
            
          </button>
        </form>
      </motion.div>
      <div></div>
    </div>
  );
};

export default Form;
