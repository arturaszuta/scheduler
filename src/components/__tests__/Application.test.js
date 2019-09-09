import React from "react";
import { act } from "react-dom/test-utils";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getAllByAltText, getByPlaceholderText, queryByText, getByTestId } from "@testing-library/react";



import Application from "components/Application";
import { tsExternalModuleReference } from "@babel/types";
import Appointment from "components/Appointment";

afterEach(cleanup);


describe("Application", () => {

  
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"));
  });
  
  it("defaults to Monday and changes the schedule when a new day is selected",async  () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

  });

  it("opens appointment, enters student name and saves it", async () => {

    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
  })

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    
    // await waitForElement(() => getByText(appointment, "Sylvia Palmer"));
    
    // debug();

    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );
  
    // expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Delete"));

    await waitForElement(() => getByText(container, "Are you sure you want to delete this appointment?"));

    fireEvent.click(getByText(container, "Confirm"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // await waitForElement(() => getByAltText(appointment, "Add"));

    // debug();

    const day = getAllByTestId(container, "day").find(day =>
      getByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Edit"));

    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Thomas" }
    });

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // await waitForElement(() => getByAltText(appointment, "Add"));

    // debug();

    const day = getAllByTestId(container, "day").find(day =>
      getByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  })
  

})
