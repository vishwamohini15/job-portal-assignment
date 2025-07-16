import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { notifyInfo } from '../utils/notify';
import { sendEmail } from '../utils/emailSimulator';
import templates from '../data/emailTemplates';

const statuses = ['applied', 'reviewing', 'interview', 'hired', 'rejected'];

const HiringBoard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('applications')) || [];
    setApplications(stored);
  }, []);

  const grouped = statuses.reduce((acc, status) => {
    acc[status] = applications.filter(app => app.status === status);
    return acc;
  }, {});

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const updatedApps = applications.map(app =>
      app.id === draggableId ? { ...app, status: destination.droppableId } : app
    );

    setApplications(updatedApps);
    localStorage.setItem('applications', JSON.stringify(updatedApps));

    notifyInfo("Applicant moved to " + destination.droppableId)

   // ✅ Send email to seeker
  const movedApp = updatedApps.find(app => app.id === draggableId);
  if (movedApp) {
    sendEmail(
      'seeker@example.com', // you can also use movedApp.applicantId if it stores email
      'Application Status Update',
      templates.statusUpdated(destination.droppableId)
    );
  }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hiring Pipeline</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {statuses.map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded p-2 min-h-[300px]"
                >
                  <h3 className="text-sm font-semibold capitalize mb-2">{status}</h3>
                  {grouped[status].map((app, index) => (
                    <Draggable key={app.id} draggableId={app.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          className="bg-white rounded shadow p-2 mb-2"
                        >
                          <p className="text-sm font-semibold">Applicant: {app.applicantId}</p>
                          <p className="text-xs text-gray-600">Job: {app.jobId}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default HiringBoard;
