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
    notifyInfo("Applicant moved to " + destination.droppableId);

    const movedApp = updatedApps.find(app => app.id === draggableId);
    if (movedApp) {
      sendEmail(
        'seeker@example.com',
        'Application Status Update',
        templates.statusUpdated(destination.droppableId)
      );
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Hiring Pipeline</h2>

      <div className="overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 min-w-[900px] md:min-w-full">
            {statuses.map(status => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 bg-lime-100 rounded-lg shadow-md p-3 min-h-[350px] w-[250px]"
                  >
                    <h3 className="text-base font-semibold capitalize text-center text-blue-600 border-b pb-2 mb-3">
                      {status}
                    </h3>

                    {grouped[status].map((app, index) => (
                      <Draggable key={app.id} draggableId={app.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            className="bg-gray-50 border border-gray-200 rounded p-3 mb-3 shadow-sm hover:shadow transition-all duration-200"
                          >
                            <p className="text-sm font-medium">👤 {app.applicantId}</p>
                            <p className="text-xs text-gray-500">📄 Job ID: {app.jobId}</p>
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
    </div>
  );
};

export default HiringBoard;
